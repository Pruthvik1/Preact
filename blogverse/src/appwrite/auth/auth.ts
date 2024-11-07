import { Account, Client, ID } from "appwrite";
import { config } from "../../config/config"; // Using named import

// Define types for the arguments in methods
interface CreateAccountParams {
 email: string;
 password: string;
 name: string;
}

interface LoginParams {
 email: string;
 password: string;
}

// Define the type for the user object (based on what you get from account.get())
interface User {
 $id: string;
 $createdAt: string;
 $updatedAt: string;
 email: string;
 name: string;
 // Add any other fields returned by account.get()
}

export class AuthService {
 client: Client;
 account: Account;

 constructor() {
  // Initialize the Client
  this.client = new Client();
  // Set the endpoint and project
  this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

  // Initialize the Account with the client
  this.account = new Account(this.client);
 }

 // Method to create an account
 async createAccount({ email, password, name }: CreateAccountParams) {
  try {
   const userAccount = await this.account.create(ID.unique(), email, password, name);
   if (userAccount) {
    return this.login({ email, password });
   } else {
    return userAccount;
   }
  } catch (error) {
   throw error;
  }
 }

 // Method to log in
 async login({ email, password }: LoginParams) {
  try {
   return await this.account.createEmailPasswordSession(email, password);
  } catch (error) {
   throw error;
  }
 }

 // Method to get the current user
 async getCurrentUser(): Promise<User> {
  try {
   return await this.account.get(); // This returns the current logged-in user
  } catch (error) {
   throw error;
  }
 }

 async logout() {
  try {
   await this.account.deleteSessions();
  } catch (error) {
   throw error;
  }
 }
}

// Exporting AuthService instance
export const authService = new AuthService();
