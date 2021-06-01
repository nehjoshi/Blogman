import React from 'react';
import '../App.css';
import pic from '../postinfo-img.jpg';

const ValidPosts = () => {
    return (
        <div class="content-wrapper validpost-wrapper">
            <div class="main-content-wrapper">
                <h4 class="validpost-heading">Rules for Creating Posts</h4>
                <p class="validpost-heading-secondary">Updated on 15th March 2021 | From the CEO</p><br />
                <hr style={{ border: '0.1px solid rgb(161, 150, 150)', width: '75%' }}></hr><br />
                <div class="textcontent-wrapper">
                    <div class="textcontent-box">
                        <img src={pic} class="validpost-image" /><br />
                        <h5 class="text-subheading">Why rules?</h5><br />
                        <p class="text-intro">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        <p class="text-intro"><strong>There are mainly three things to remember while making posts:</strong></p><br/><br/>
                        <div class="points-wrapper">
                            <div class="point">
                                <div class="point-circle"></div>
                                <p class ="point-text point1">Strictly No Profanity!</p>
                            </div>
                            <div class="point">
                                <div class="point-circle"></div>
                                <p class ="point-text">No Racism, Sexism or Political Comments!</p>
                            </div>
                            <div class="point">
                                <div class="point-circle"></div>
                                <p class ="point-text point3">No abusing or bullying!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ValidPosts