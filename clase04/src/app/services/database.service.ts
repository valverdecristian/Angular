import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    console.log(this.supabase);
  }
}