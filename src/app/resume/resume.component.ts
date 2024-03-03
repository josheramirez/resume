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
  @ViewChild('page', { 'static': true }) page:any;
  
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.data = data
  }
  ngOnInit() {
    console.log(this.data);
  }

  sendToPdf() {
    var doc = new jsPDF('p', 'px', [1240, 1759]);

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
}
