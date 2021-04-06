import React from 'react';
import { Button } from 'react-bootstrap'
import 'font-awesome/css/font-awesome.min.css';
import '../styles/dashboard.css';

export default function Footer() {
    return (
        <footer id="aboutSection">
            {/* dashFooterId */}
          
          <div id="dash-box">
            
            <div id="dash-report">
                 <div>
                    <h3>Feedback</h3>
                </div>
            
                <div className="report-box">

                    <form action="#">
                        <div>
                            <input type="text" placeholder="Enter your Name"
                                className="report-input"
                                required />
                        </div>

                        <div >
                            <input type="Email" placeholder="Enter your Email Address"
                                className="report-input report-email"
                                required />
                        </div>

                        <div>
                            <textarea placeholder="Enter your message" name="message" className="report-text" rows="4" cols="30" required> </textarea>
                        </div>

                        <Button className="report-btn" variant="primary">Send</Button>
                    </form>
                </div>

            
            </div>
            
        </div>
            <div className="dash-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7206.531301993903!2d81.76718472516806!3d25.429380735154687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398533530cce2e67%3A0xbf1514c2084929b7!2sIndian%20Institute%20of%20Information%20Technology%2C%20Jhalwa%2C%20Prayagraj%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1617375028597!5m2!1sen!2sin" width="500" height="450" style={{ "border": "0" }} allowfullscreen="" loading="lazy"></iframe>
            </div>

            <div className="footer">
                {/* dashAboutUs */}
                <h1>About Us</h1>
                <div className="contact">
                    <div className="github">
                        <h6>Members (Github)</h6>
                        <ul className="git-list">
                            <li><i className="fa fa-github"></i>
                                <a href="https://github.com/anshumanbhardwaj1370" target="_blank"> Anshuman Bhardwaj </a>
                            </li>
                            <li><i className="fa fa-github"></i>
                                <a href="https://github.com/cremento" target="_blank"> Vanshika Garg </a>
                            </li>
                            <li><i className="fa fa-github"></i>
                                <a href="https://github.com/sanskar-p" target="_blank"> Sanskar Patro </a>
                            </li>
                            <li><i className="fa fa-github"></i>
                                <a href="https://github.com/curiouskid26" target="_blank"> Gitika Yadav </a>
                            </li>

                        </ul>
                    </div>

                    <div className="mails">
                        <h6>Mail Us</h6>
                        <ul className="dash-mail-id">
                            <li> <i className="fa fa-envelope"></i><a href="iit2019227@iiita.ac.in">&ensp; iit2019227@iiita.ac.in </a></li>
                            <li> <i className="fa fa-envelope"></i><a href="iit2019216@iiita.ac.in">&ensp; iit2019216@iiita.ac.in </a></li>
                            <li> <i className="fa fa-envelope"></i><a href="iit2019205@iiita.ac.in">&ensp; iit2019205@iiita.ac.in </a></li>
                            <li> <i className="fa fa-envelope"></i><a href="iit2019219@iiita.ac.in">&ensp; iit2019219@iiita.ac.in </a></li>
                        </ul>
                    </div>



                </div>

                <div className="copyright">
                    {/* dash-copyright */}
                  &copy; drinksapHe. All rights reserved | Created by Group of IIITA Students
               </div>

            </div>

        </footer>
    )
}