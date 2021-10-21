import { CandidateService } from 'src/app/core/services/candidate.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DataItem {
  name: string;
  location: string;
  skill: string;
  status: string;
  feedback1: number;
  feedback2: number;
}

@Component({
  selector: 'app-candidates-page',
  templateUrl: './candidates-page.component.html',
  styleUrls: ['./candidates-page.component.scss']
})

export class CandidatesPageComponent implements OnInit {
  constructor(private candidates: HttpClient) { }

  searchValue = '';
  visible = false;

  listOfData: DataItem[] = [];

  listOfDisplayData = [...this.listOfData];

  listOfFilter = [...this.listOfData.map(item => {
    const newobj = {text: '', value: ''}
    newobj.text = newobj.value = item.location
    return newobj
  } )]

  filterFn = (list: string[], item: DataItem) => list.some(location => item.location.indexOf(location) !== -1)

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  ngOnInit(): void {
    // this.candidates.get('assets/candidates.json')
    //   .subscribe(response => {
    //     this.listOfData  = response
    //   })
  }
}
