import {Component} from 'react'
import './App.css'
import {FaFilter} from 'react-icons/fa'

class App extends Component {
  state = {
    candidates: [],
    searchQuery: '',
    filter: {gender: '', experience: '', skills: []},
    currentPage: 1,
    candidatesPerPage: 10,
    newCandidate: {
      name: '',
      phone: '',
      email: '',
      gender: '',
      experience: '',
      skills: [],
    },
    showModal: false,
    showFilter: false,
    skillInput: '',
  }

  componentDidMount() {
    this.setState({
      candidates: [
        {
          id: 1,
          name: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          gender: 'Male',
          experience: '2 Years',
          skills: ['JavaScript', 'React'],
        },
        {
          id: 2,
          name: 'Jane Smith',
          phone: '0987654321',
          email: 'jane@example.com',
          gender: 'Female',
          experience: '3 Years',
          skills: ['Python', 'Django'],
        },
      ],
    })
  }

  handleSearch = e => {
    this.setState({searchQuery: e.target.value})
  }

  handleFilterChange = (field, value) => {
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        [field]:
          field === 'skills' ? value.map(skill => skill.toLowerCase()) : value,
      },
    }))
  }

  handlePageChange = page => {
    this.setState({currentPage: page})
  }

  handleInputChange = e => {
    const {name, value} = e.target
    this.setState(prevState => ({
      newCandidate: {...prevState.newCandidate, [name]: value},
    }))
  }

  handleSkillInputChange = e => {
    this.setState({skillInput: e.target.value})
  }

  addSkill = () => {
    const {skillInput} = this.state
    if (skillInput.trim()) {
      this.setState(prevState => ({
        newCandidate: {
          ...prevState.newCandidate,
          skills: [
            ...new Set([
              ...prevState.newCandidate.skills,
              prevState.skillInput.trim(),
            ]),
          ],
        },
        skillInput: '',
      }))
    }
  }

  handleSubmit = () => {
    this.setState(prevState => ({
      candidates: [
        ...prevState.candidates,
        {...prevState.newCandidate, id: Date.now()},
      ],
      newCandidate: {
        name: '',
        phone: '',
        email: '',
        gender: '',
        experience: '',
        skills: [],
      },
      showModal: false,
    }))
  }

  render() {
    const {
      candidates,
      searchQuery,
      filter,
      currentPage,
      candidatesPerPage,
      showModal,
      newCandidate,
      showFilter,
      skillInput,
    } = this.state

    const filteredCandidates = candidates.filter(
      candidate =>
        (candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.phone.includes(searchQuery) ||
          candidate.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!filter.gender || candidate.gender === filter.gender) &&
        (!filter.experience || candidate.experience === filter.experience) &&
        (!filter.skills.length ||
          filter.skills.every(skill =>
            candidate.skills.map(s => s.toLowerCase()).includes(skill),
          )),
    )

    const indexOfLastCandidate = currentPage * candidatesPerPage
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage
    const currentCandidates = filteredCandidates.slice(
      indexOfFirstCandidate,
      indexOfLastCandidate,
    )

    return (
      <div className="container">
        <h2>Candidate Management</h2>
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            onChange={this.handleSearch}
          />
          <button
            type="button"
            onClick={() => this.setState({showFilter: !showFilter})}
            className="filter-button"
          >
            <FaFilter />
          </button>
          <button
            type="button"
            className="filter-button"
            onClick={() => this.setState({showModal: true})}
          >
            Add Candidate
          </button>
        </div>
        {showFilter && (
          <div className="filter-section">
            <select
              onChange={e => this.handleFilterChange('gender', e.target.value)}
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              onChange={e =>
                this.handleFilterChange('experience', e.target.value)
              }
            >
              <option value="">All Experience</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
            </select>
            <input
              type="text"
              placeholder="Filter by skills (comma separated)"
              onChange={e =>
                this.handleFilterChange(
                  'skills',
                  e.target.value
                    .split(',')
                    .map(skill => skill.trim().toLowerCase()),
                )
              }
            />
          </div>
        )}
        {showModal && (
          <div className="modal">
            <h3>Add Candidate</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newCandidate.name}
              onChange={this.handleInputChange}
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={newCandidate.phone}
              onChange={this.handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newCandidate.email}
              onChange={this.handleInputChange}
            />
            <select
              name="gender"
              onChange={this.handleInputChange}
              value={newCandidate.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="experience"
              onChange={this.handleInputChange}
              value={newCandidate.experience}
            >
              <option value="">Select Experience</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
            </select>
            <input
              type="text"
              placeholder="Add Skill"
              value={skillInput}
              onChange={this.handleSkillInputChange}
            />
            <button
              type="button"
              className="filter-button"
              onClick={this.addSkill}
            >
              Add Skill
            </button>
            <p>Skills: {newCandidate.skills.join(', ')}</p>
            <button
              type="button"
              className="filter-button"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="filter-button"
              onClick={() => this.setState({showModal: false})}
            >
              Cancel
            </button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Experience</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {currentCandidates.map(candidate => (
              <tr key={candidate.id} className="hover-row">
                <td>{candidate.name}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.email}</td>
                <td>{candidate.gender}</td>
                <td>{candidate.experience}</td>
                <td>{candidate.skills.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App

