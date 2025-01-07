
import './App.css'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='task-organizerly-theme'>
      <h1>My Task/</h1>
    </ThemeProvider>
  )
}
export default App
