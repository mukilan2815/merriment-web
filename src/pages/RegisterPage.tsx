
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import RegisterForm from '@/components/auth/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterPage: React.FC = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Create Account"
        description="Join our platform to book events and manage your tickets"
      />
      <Container className="py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Create a new account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account?</span>{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageLayout>
  );
};

export default RegisterPage;
