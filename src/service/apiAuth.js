import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   data: { fullName },
      // },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    throw new Error("Signup failed. Please try again.");
  }
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

//protected routes authentications
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
