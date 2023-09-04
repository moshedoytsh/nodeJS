import './App.css'
import Grandpa from './components/1/Grandpa'
import TextContextProvider from './components/1/TextContext'
import Card from './components/2/Card'
import Header from './components/2/Header'
import ThemeContextProvider from './components/2/ThemeContext'
import UserProvider from './components/2/UserContext'
import Main from './components/2/main'


function App() {

  return (
    <>
    <h2>1.</h2>
    <TextContextProvider>
      <Grandpa/>
    </TextContextProvider>
    <h2>2.</h2>
    <UserProvider>
    <ThemeContextProvider>
      <Header/>
      <Card/>
      <Main/>
    </ThemeContextProvider>
    </UserProvider>
    </>
  )
}

export default App
