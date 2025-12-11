'use server'

export async function signIn(formData: FormData) {
  const id = formData.get('id')
  const pw = formData.get('pw')

  console.log('로그인 완료!', id, pw)
}

export async function signOut() {
  console.log('로그아웃 했습니다!')
}
