export {}

enum roleType{
    student,
    teacher,
    employer,
    admin
}


declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean,
      role?: roleType,
    }
  }
}