import { Component, OnInit } from '@angular/core';
import { JobHistoryService } from '../services/job-history.service';
import { JobHistory } from '../models/job-history';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.css']
})
export class JobHistoryComponent implements OnInit {
  job_history = {} as JobHistory;
  job_historys: JobHistory[];

  constructor(private job_historyService: JobHistoryService) {}

  ngOnInit(): void {
    this.getJobHistorys();
  }

  saveJobHistory(form: NgForm) {
    if (this.job_history.job_history_id !== undefined) {
      this.job_historyService.updateJobHistory(this.job_history).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.job_historyService.saveJobHistory(this.job_history).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }


  getJobHistorys() {
    this.job_historyService.getJobHistorys().subscribe((job_historys: JobHistory[]) => {
      this.job_historys = job_historys;
    });
  }

  deleteJobHistory(job_history: JobHistory) {
    this.job_historyService.deleteJobHistory(job_history).subscribe(() => {
      this.getJobHistorys();
    });
  }


  editJobHistory(job_history: JobHistory) {
    this.job_history = { ...job_history };
  }

  cleanForm(form: NgForm) {
    this.getJobHistorys();
    form.resetForm();
    this.job_history = {} as JobHistory;
  }
}
