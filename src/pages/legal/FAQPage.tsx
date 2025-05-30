import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused items in their original packaging. Return shipping is free for domestic orders.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email to monitor your delivery status.'
    },
    {
      question: 'Are your products authentic?',
      answer: 'Yes, all our products are 100% authentic and sourced directly from authorized manufacturers and distributors.'
    },
    {
      question: 'What size should I order?',
      answer: 'Please refer to our size guide on each product page. If you\'re between sizes, we recommend ordering the larger size.'
    },
    {
      question: 'Do you offer gift wrapping?',
      answer: 'Yes, we offer gift wrapping services for an additional $5 per item. You can select this option during checkout.'
    },
    {
      question: 'How do I cancel my order?',
      answer: 'You can cancel your order within 1 hour of placing it. Contact our customer service team for assistance.'
    },
    {
      question: 'Do you have a loyalty program?',
      answer: 'Yes, join our rewards program to earn points on purchases and receive exclusive member benefits.'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
            <p className="text-gray-600 mb-4">
              Our customer service team is here to help.
            </p>
            <Button variant="primary">Contact Us</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};