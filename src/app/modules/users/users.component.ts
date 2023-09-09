import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { IContentTable } from '../../shared/interfaces/i-content-table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users!: IContentTable[];
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    })
  }
}
