import { Header } from './components/header'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='task-organizerly-theme'>
      <Header />
    </ThemeProvider>
  )
}
export default App
