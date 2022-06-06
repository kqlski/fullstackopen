import { CoursePart } from "../types"
const PartHeader = ({ name, exerciseCount }: { name: string, exerciseCount: number }) => {
  return <div><strong>{name} {exerciseCount}</strong></div>;
}
const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (part.type) {
    case "normal":
      return <p>
        <PartHeader name={part.name} exerciseCount={part.exerciseCount} />
        <i>{part.description}</i>
      </p>
    case "groupProject":
      return <p>
        <PartHeader name={part.name} exerciseCount={part.exerciseCount} />
        <span>project exercises {part.groupProjectCount}</span>
      </p>;
    case "submission":
      return <p>
        <PartHeader name={part.name} exerciseCount={part.exerciseCount} />
        <i>{part.description}</i> <br />
        <span>submit to <a href={part.exerciseSubmissionLink} target="_blank" rel="noopener noreferrer">{part.exerciseSubmissionLink}</a></span>
      </p>;
    case "special":
      return <p>
        <PartHeader name={part.name} exerciseCount={part.exerciseCount} />
        <i>{part.description}</i> <br />
        <span>required skills: {part.requirements.join(", ")}</span>
      </p>
    default:
      return assertNever(part)
  }
}

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return <>
    {courseParts.map(part => (<Part key={part.name} part={part} />))
    }</>;
}
export default Content;