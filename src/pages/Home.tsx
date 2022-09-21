import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    if (!newTaskTitle) return
    if (newTaskTitle === '') return

    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskAlreadyExists = updatedTasks.find(task => task.title === newTaskTitle)

    if (taskAlreadyExists) return

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, data])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskToToggle = updatedTasks.find(taskToToggle => taskToToggle.id === id)
    if (!taskToToggle) return

    taskToToggle.done = !taskToToggle.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks => tasks.filter(
      task => task.id !== id
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})