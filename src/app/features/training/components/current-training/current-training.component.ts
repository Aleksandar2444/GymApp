import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	EventEmitter,
	Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '@@training-service/training.service';
import { StopTrainingComponent } from '@@training/stop-training/stop-training.component';

@Component({
	selector: 'app-current-training',
	templateUrl: './current-training.component.html',
	styleUrls: ['./current-training.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTrainingComponent implements OnInit {
	@Output() trainingExit = new EventEmitter();

	progress = 0;
	timer: number | any;

	constructor(
		private readonly dialog: MatDialog,
		private readonly trainingService: TrainingService
	) {}

	ngOnInit() {
		this.resumeTimer();
	}

	resumeTimer() {
		const step =
			(this.trainingService.getRunningExercise().duration / 100) * 1000;
		this.timer = setInterval(() => {
			this.progress = this.progress + 1;
			if (this.progress >= 100) {
				this.trainingService.completeExercise();
				clearInterval(this.timer);
			}
		}, step);
	}

	onStop() {
		clearInterval(this.timer);
		const dialogRef = this.dialog.open(StopTrainingComponent, {
			data: {
				progress: this.progress,
			},
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.trainingService.cancleExercise(this.progress);
			} else {
				this.resumeTimer();
			}
		});
	}
}
