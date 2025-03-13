
import React from 'react';
import { Container } from '@/components/layout/Container';
import PageHeader from '@/components/layout/PageHeader';
import PageLayout from '@/components/layout/PageLayout';
import ContactForm from '@/components/contact/ContactForm';

const ContactPage = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Contact Us"
        description="Have questions or need assistance? We're here to help."
      />
      
      <Container className="py-12">
        <ContactForm />
      </Container>
    </PageLayout>
  );
};

export default ContactPage;
