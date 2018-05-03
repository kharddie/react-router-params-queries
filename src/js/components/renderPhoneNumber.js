import Phone from 'react-phone-number-input'
 
return (
    <Phone
        placeholder="Enter phone number"
        value={ this.state.phone }
        onChange={ phone => this.setState({ phone }) } />
)
export default RenderPhoneNumber;
