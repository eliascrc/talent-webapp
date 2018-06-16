import {BasicEntity} from '@model/BasicEntity';
import {TechnicalResource} from '@model/TechnicalResource';
import {Project} from '@model/Project';
import {FeedbackType} from '@model/FeedbackType';

/**
 * Class that represents a feedback(kudo or warning) within the Talent system.
 * It contains the description, observee, observer, the related project, feedback type
 * and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class Feedback extends BasicEntity {
  description: string;
  observee: TechnicalResource;
  observer: TechnicalResource;
  relatedProject: Project;
  feedbackType: FeedbackType;

  constructor(feedback: any) {
    super(feedback);
    this.description = feedback.description;
    this.observee = feedback.observee;
    this.observer = feedback.observer;
    this.relatedProject = feedback.relatedProject;
    this.feedbackType = feedback.feedbackType;
  }
}
