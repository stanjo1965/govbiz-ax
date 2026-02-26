import Credentials from 'next-auth/providers/credentials';

export function createCredentialsProvider() {
  return Credentials({
    name: '공공 계정',
    credentials: {
      email: { label: '이메일', type: 'email', placeholder: 'user@gov.kr' },
      password: { label: '비밀번호', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      // Each app should override this with their own user lookup
      // This is a base template
      return null;
    },
  });
}

export { default as CredentialsProvider } from 'next-auth/providers/credentials';
