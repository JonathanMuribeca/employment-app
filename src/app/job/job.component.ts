import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Job } from '../models/job';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  job = {} as Job;
  jobs: Job[];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  saveJob(form: NgForm) {
    if (this.job.job_id !== undefined) {
      this.jobService.updateJob(this.job).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.jobService.saveJob(this.job).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }


  getJobs() {
    this.jobService.getJobs().subscribe((jobs: Job[]) => {
      this.jobs = jobs;
    });
  }

  deleteJob(job: Job) {
    this.jobService.deleteJob(job).subscribe(() => {
      this.getJobs();
    });
  }


  editJob(job: Job) {
    this.job = { ...job };
  }

  cleanForm(form: NgForm) {
    this.getJobs();
    form.resetForm();
    this.job = {} as Job;
  }

}
