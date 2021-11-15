import { Project } from 'src/app/shared/models/Project';
import { InternshipsFacade } from './internships.facade';
import { ProjectsPageFacade } from './../projects-page/projects-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss'],
})
export class InternshipsComponent implements OnInit {
  activeProjects!: Project[];
  // cardCount = [0, 1, 2, 3];

  // skills = [
  //   {
  //     active: false,
  //     disabled: false,
  //     name: 'Requirements for Javascript developers',
  //     description:
  //       '✔️Английский язык: Intermediate и выше; ✔️Базовые знания JavaScript, HTML, CSS; ✔️Общее представление о системах контроля версий; ✔️Опыт работы с редакторами кода Visual Studio Code / Sublime / WebStorm; ✔️Базовые знания HTTP / Rest; ➕Дополнительным плюсом будут базовые знания фреймворка Angular /React, асинхронность в JavaScript, DOM, BOM, Node.js.',
  //   },
  //   {
  //     active: false,
  //     disabled: false,
  //     name: 'Requirements for .NET developers',
  //     description:
  //       '✔️Английский язык: Intermediate и выше; ✔️ООП - понимание основ; ✔️HTTP / REST - базовые знания; ✔️Базы данных, SQl или Mongo (умение писать запросы select/insert/join); ✔️.Net, C# - базовые знания (типы данных, переменные, свойства, методы, классы); ✔️Асинхронные операции (async / await / task); ✔️Умение работать с VisualStudio 2017/2019; ✔️Основы WEB API; ➕Дополнительным плюсом будет знание принципов SOLID, KISS, DRY, YAGNI, общее понимание систем контроля версий и юнит тестов.',
  //   },
  //   {
  //     active: false,
  //     disabled: false,
  //     name: 'Requirements for Business analysts',
  //     description: '',
  //   },
  // ];

  constructor(private projectsPageFacade: ProjectsPageFacade) {}

  ngOnInit(): void {
    this.projectsPageFacade.getProjectsList$().subscribe((response) => {
      console.log(response);
      this.activeProjects = response.filter((project) => project.isActive);
    });
  }

  getProjectDuration(start: string | Date, end: string | Date) {
    // console.log(start, end);
    console.log(start.toString());
  }
}
