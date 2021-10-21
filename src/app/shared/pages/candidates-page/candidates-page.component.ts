import { Candidate } from './../../models/Candidate';
import { CandidatesPageFacade } from './candidates-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidates-page',
  templateUrl: './candidates-page.component.html',
  styleUrls: ['./candidates-page.component.scss']
})

export class CandidatesPageComponent implements OnInit {
  searchValue = '';
  visible = false;

  listOfData: Candidate[] = [];

  constructor(private candidatesPageFacade: CandidatesPageFacade) { }

  listOfFilter = [...this.listOfData.map(item => {
    const newobj = {text: '', value: ''}
    newobj.text = newobj.value = item.location
    return newobj
  })]
  filterFn = (list: string[], item: Candidate) => list.some(location => item.location.indexOf(location) !== -1)

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfData = this.listOfData.filter((item: Candidate) => item.name.indexOf(this.searchValue) !== -1);
  }

  ngOnInit(): void {
    this.candidatesPageFacade.candidateList$
      .subscribe(response => this.listOfData = response)
  }
}
