import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import data from '../../assets/data.json';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit{
  data:any = "";
  actual_language = "english";
  next_language = "español";
  item_activities = []
  languages = [
    {"language":"english","label":"english"},
    {"language":"spanish","label":"español"},
    {"language":"chinese","label":"中国人"},
  ]

  @ViewChild('page', { 'static': true }) page:any;
  
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.data = data
  }
  ngOnInit() {
    console.log(this.data);
  }

  sendToPdf() {
    var doc = new jsPDF('p', 'px', [1240, 1717]);

    // doc.addFont("Ubuntu", "Helvetica Neue", "sans-serif")
    let pdfjs = this.page.nativeElement;
  
    // Convert HTML to PDF in JavaScript
    doc.html(pdfjs, {
      callback: function(doc) {
        doc.save("resume.pdf");
      },
      x: 0,
      y: 0
    });
  } 

  set_language(language:any){
    this.actual_language = language.language
  }

  translate(section:any, type:any, index?:any){
    switch (type) {
      case "data":
        return(this.data[section][this.actual_language])
        break;
      case "ui":        
        return(this.data[type][section][this.actual_language])
        break;
      case "item":        
        return(this.data[section][index][this.actual_language])
        break;
      default:
        break;
    }
  }

get_activities(data:any){
  this.item_activities = data
}

}
