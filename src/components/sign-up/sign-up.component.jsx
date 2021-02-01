import React from 'react';
//custom components
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
//firebase
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'; 
//styles
import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault(); // preventing default behaviour of the form

        const { displayName, email, password, confirmPassword } = this.state; // desctructuring state object into variables

        if (password !== confirmPassword) { //exits function if passwords do not match
            alert("password's don't match")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password); // destructuing user ot the return of firebase function
            
            await createUserProfileDocument(user, {displayName}); // adding new user to the database

            this.setState({ //clearing out form
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch(error) {
            console.error(error);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'> SIGN UP </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;