import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { 
    const supabase = createClient("https://wtjylfdfdwowzzvunlpa.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0anlsZmRmZHdvd3p6dnVubHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDI0ODMsImV4cCI6MjA2ODM3ODQ4M30.fqCZIiw9N8PMjyCKCH1378bztIChdLfisXbEzbIkEfE");

    console.log(supabase);
    
  }
}
