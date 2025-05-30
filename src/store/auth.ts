import { create } from 'zustand';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null, user: User | null }>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateProfile: (profileData: Partial<User['profile']>) => Promise<{ error: any | null }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data?.user) {
        await get().loadUser();
        return { error: null };
      }

      return { error: new Error('Unknown error occurred during sign in') };
    } catch (error) {
      return { error };
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error, user: null };
      }

      if (data?.user) {
        // Create a profile for the new user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        await get().loadUser();
        
        return { 
          error: null, 
          user: { 
            id: data.user.id, 
            email: data.user.email || ''
          } 
        };
      }

      return { 
        error: new Error('Unknown error occurred during sign up'),
        user: null
      };
    } catch (error) {
      return { error, user: null };
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    set({ isLoading: true });
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      set({
        user: {
          id: session.user.id,
          email: session.user.email || '',
          profile: profile || undefined,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading user:', error);
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateProfile: async (profileData) => {
    const user = get().user;
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);

      if (error) return { error };

      // Reload user data to get updated profile
      await get().loadUser();
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
}));