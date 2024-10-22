export type OAuthProviders = 'google' | 'kakao'

export interface AuthTokens {
  accessToken: string
}

export interface SignInForm {
  email: string
  password: string
}

export interface OAuthSignInForm {
  redirectUri?: string
  token: string
}
export interface OAuthSignUpForm {
  nickname: string
  redirectUri?: string
  token: string
}


export interface SignUpForm {
  email: string
  nickname: string
  password: string
  passwordConfirmation: string
}

export interface SignInReturn {
  accessToken: string
  user: {
    id: number
    email: string
    nickname: string
    teamId: string
    updatedAt: string
    createdAt: string
    image: string | null
<<<<<<< HEAD
    description: 'string'
  }
}
export interface oauthAppsReturn {
  createdAt: string
  updatedAt: string
  appKey: string
  provider: OAuthProviders
  teamId: string
  id: number
<<<<<<< Updated upstream
  }
=======
=======
  }
>>>>>>> dev
>>>>>>> Stashed changes
}
