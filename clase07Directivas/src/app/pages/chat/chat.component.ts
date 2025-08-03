import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Mensaje } from '../../models/mensaje';
import { trigger, transition, style, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [DatePipe],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ChatComponent implements OnInit{
  supabase = inject(SupabaseService)
  mensajes: Mensaje[] = [];

  async ngOnInit() {
      // traer mensajes existentes
      this.mensajes = await this.supabase.obtenerMensajes();

      // escuchar mensajes nuevos en tiempo real
      this.supabase.traerEnTiempoReal((mensaje) => {
        this.mensajes.push(mensaje);
        setTimeout(()=> {
          const container = document.querySelector('.chat-container');
          if (container) container.scrollTop = container.scrollHeight;
        }, 100)
      
    })
  }
}
