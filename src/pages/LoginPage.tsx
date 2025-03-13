
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage: React.FC = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Login"
        description="Sign in to your account to access your events and bookings"
      />
      <Container className="py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account?</span>{' '}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Register now
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageLayout>
  );
};

export default LoginPage;
