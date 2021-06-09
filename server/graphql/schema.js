const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type UserType{
        id: ID
        name: String
        profileImg: String
        exercises: [ExerciseType]
        logs: [LogType]
    }

    type ExerciseType{
        id: ID
        userId: ID
        name: String
        workouts: [String]
    }

    type LogType{
        id: ID
        userId: ID
        date: String
        logs: [EachLogType]
    }

    type EachLogType{
        exercise: String
        workout: String
    }

    input ExerciseInput{
        id: ID
        userId: ID
        name: String
        workouts: [String]
    }

    input LogInput{
        id: ID
        userId: ID
        date: String
        logs: [EachLogInput]
    }

    input EachLogInput{
        exercise: String
        workout: String
    }

    type Query{
        user(id: ID): UserType
    }

    type Mutation{
        addNewExercise(input: ExerciseInput): ExerciseType
        updateExercise(input: ExerciseInput): ExerciseType
        deleteExercise(input: ExerciseInput): ExerciseType
        addNewLog(input: LogInput): LogType
        updateLog(input: LogInput): LogType
        deleteLog(input: LogInput): LogType
    }
`);

module.exports = schema;
