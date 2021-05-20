// Progress Bar bootstrap helper class
class ProgressBar {
  constructor(progressbar) {
    this.progressBar = progressbar; // Progress Bar
    this.progress = 0;              // Tracking Progress
  }
  changeProgress(val) {
    this.progress = val
    this.progressBar.style.width = this.progress + '%';
    this.progressBar.setAttribute('aria-valuenow', this.progress);
  }
}
