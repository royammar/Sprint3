import emailService from "../services/emailService.js";
// import eventBusService from '../../../services/eventBusService.js'

const { Link } = ReactRouterDOM

export default class NewMail extends React.Component {
    state = {
        email: null,
        subject: '',
        body: '',

    }
    componentDidMount() {
        if (this.props.match.params.id) {
            let id = this.props.match.params.id
            emailService.getEmailById(id)
                .then(email => this.setState({ email: email, subject: 're:' + email.subject, body: email.body }))
        }
    }

    componentWillUnmount() {

    }


    onSave = () => {
        emailService.createMail(this.state.subject, this.state.body).then(this.props.history.push('/emails'))
        // eventBusService.emit('toggleModal', 'You received new mail!')
    }
    inputChange = (ev) => {
        let fieldName = ev.target.name
        this.setState({ [fieldName]: ev.target.value })
    }
    onInboxClick = () => {
        this.props.history.push('/emails')
    }

    render() {
        return <div className="new-email-container">
            <div className="new-email-header">New Massege</div>
            <div className="compose-contaimer">
                <div className="new-email-compose">
                    <input type="text" placeholder="Subject" name="subject"
                        onChange={this.inputChange} value={this.state.subject}></input>
                    <textarea onChange={this.inputChange} value={this.state.body}
                        placeholder="Enter your mail here" className="email-body" name="body" id="" cols="30" rows="10"></textarea>

                    <div className="email-buttons-container">
                        <button className="email-btn" onClick={this.onInboxClick}>Inbox</button>
                        <button className="email-btn" onClick={this.onSave}><i className="far fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>


        </div>
    }
}