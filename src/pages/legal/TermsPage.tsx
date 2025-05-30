import React from 'react';
import { Layout } from '../../components/layout/Layout';

export const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-600">
                These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Attire Avenue accessible at www.attireavenue.com.
              </p>
              <p className="text-gray-600 mt-2">
                These Terms will be applied fully and affect your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">2. Intellectual Property Rights</h2>
              <p className="text-gray-600">
                Other than the content you own, under these Terms, Attire Avenue and/or its licensors own all the intellectual property rights and materials contained in this Website.
              </p>
              <p className="text-gray-600 mt-2">
                You are granted limited license only for purposes of viewing the material contained on this Website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">3. Restrictions</h2>
              <p className="text-gray-600">You are specifically restricted from all of the following:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mt-2">
                <li>publishing any Website material in any other media</li>
                <li>selling, sublicensing and/or otherwise commercializing any Website material</li>
                <li>publicly performing and/or showing any Website material</li>
                <li>using this Website in any way that is or may be damaging to this Website</li>
                <li>using this Website in any way that impacts user access to this Website</li>
                <li>using this Website contrary to applicable laws and regulations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">4. Your Content</h2>
              <p className="text-gray-600">
                In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Attire Avenue a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
              </p>
              <p className="text-gray-600 mt-2">
                Your Content must be your own and must not be invading any third-party's rights. Attire Avenue reserves the right to remove any of Your Content from this Website at any time without notice.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">5. No warranties</h2>
              <p className="text-gray-600">
                This Website is provided "as is," with all faults, and Attire Avenue express no representations or warranties, of any kind related to this Website or the materials contained on this Website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">6. Limitation of liability</h2>
              <p className="text-gray-600">
                In no event shall Attire Avenue, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">7. Indemnification</h2>
              <p className="text-gray-600">
                You hereby indemnify to the fullest extent Attire Avenue from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">8. Severability</h2>
              <p className="text-gray-600">
                If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">9. Variation of Terms</h2>
              <p className="text-gray-600">
                Attire Avenue is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">10. Assignment</h2>
              <p className="text-gray-600">
                The Attire Avenue is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">11. Entire Agreement</h2>
              <p className="text-gray-600">
                These Terms constitute the entire agreement between Attire Avenue and you in relation to your use of this Website, and supersede all prior agreements and understandings.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">12. Governing Law & Jurisdiction</h2>
              <p className="text-gray-600">
                These Terms will be governed by and interpreted in accordance with the laws of the State of [State], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [State] for the resolution of any disputes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};