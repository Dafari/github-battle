import React from 'react'
import PropTypes from 'prop-types'

function LanguagesNav({selectedLanguage, opUpdateLanguage}) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selectedLanguage ? {color: 'rgb(187, 46, 31)'} : null}
            onClick={() => opUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All'
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    })
  }

  render() {
    const {selectedLanguage} = this.state
    return (
      <React.Fragment>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          opUpdateLanguage={this.updateLanguage}/>
      </React.Fragment>
    )
  }
}