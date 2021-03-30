import React from "react";
import Button from "components/shared/Button";

export default (props) => {
	return (
		<section className={styles.ViewProfile}>
			<div className='inner-wrapper'>
				<h1>Account Settings</h1>
				{this.props.user && this.props.user.email && (
					<p>Email: {this.props.user.email}</p>
				)}
				{this.props.user && this.props.user.uid && (
					<p>id: {this.props.user.uid}</p>
				)}
				<Button
					className={styles.logoutBtn}
					onClick={this.handleLogout}>
					Logout
				</Button>
			</div>
		</section>
	);
};
