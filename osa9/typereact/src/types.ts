interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseNormalPart extends CoursePartWithDesc {
  type: "normal";
}

interface CourseSubmissionPart extends CoursePartWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}
interface CourseSubmissionSpecialPart extends CoursePartWithDesc{
  type:"special";
  requirements:Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSubmissionSpecialPart;

