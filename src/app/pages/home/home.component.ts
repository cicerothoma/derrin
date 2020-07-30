import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    center: true
  }

  contactUsForm: FormGroup;

  constructor(private fb: FormBuilder,
    private messagesService: MessagesService,
    private matSnackBar: MatSnackBar) {
    this.contactUsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      message: ['', Validators.required],
      date: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async submit() {
    try {
      this.contactUsForm.get('date').patchValue(new Date().getTime())
      if (this.contactUsForm.valid) {
        await this.messagesService.addMessage(this.contactUsForm.value);
        this.matSnackBar.open('Message Sent!', 'Close', {
          duration: 2000
        });
        this.contactUsForm.reset({
          name: '',
          email: '',
          message: '',
          date: ''
        })
      } else {
        this.matSnackBar.open('Form Not Valid', 'Close', {
          duration: 4000
        })
      }
    } catch (error) {
      this.matSnackBar.open(error.message, 'Close', {
        duration: 6000
      })
    }
  }

}
