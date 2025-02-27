import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {provideAnimations, provideNoopAnimations} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-dark-net',
  templateUrl: './dark-net.component.html',
  standalone: true,
  styleUrl: './dark-net.component.scss',
  animations: [
    trigger('typingAnimation', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', [
        animate('2s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class DarkNetComponent implements OnInit{

  command: string = '';
  output: string = '';

  ngOnInit() {
    this.typeCommand('ls -la');
  }

  typeCommand(cmd: string) {
    let i = 0;
    const interval = setInterval(() => {
      this.command += cmd[i];
      i++;
      if (i === cmd.length) {
        clearInterval(interval);
        // Simulate command execution and output
        this.executeCommand(cmd);
      }
    }, 100);
  }

  executeCommand(cmd: string) {
    // Simulate command execution
    setTimeout(() => {
      this.output = `Output of command: ${cmd}`;
    }, 500);
  }

}
