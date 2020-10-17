import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import DropDown from "components/shared/DropDown";
import Search from "components/shared/Search";

const ListButton = ({ active, children, to }) => (
	<Link
		to={to}
		className={classnames({
			[styles.filterButton]: true,
			[styles["is-active"]]: active,
		})}>
		{children}
	</Link>
);

export default ({ toggleDrawer, isDrawerOpen, sort, selectSortOption }) => {
	return (
		<div
			className={classnames(
				styles.sideBar,
				isDrawerOpen ? styles["is-open"] : "",
			)}>
			<div className={styles.sideBarContent}>
				<div className={styles.optionsContainer}>
					<Link to='/add'>REGISTER NEW WORK +</Link>
				</div>
				<div className={styles.optionsContainer}>
					<Search />
				</div>
				<div className={styles.optionsContainer}>
					<h4 className={styles.h4}>Sort:</h4>
					<DropDown
						handleChange={selectSortOption}
						value={sort.selected}>
						{Object.entries(sort.sortOptions)
							.map((option) => option[1])
							.map((option, index) => {
								return (
									<option
										key={`sort-option-${index}`}
										value={option.id}>
										{option.label}
									</option>
								);
							})}
					</DropDown>
				</div>
				<div className={styles.optionsContainer}>
					<h4 className={styles.h4}>Browse:</h4>
					<ListButton to={"/collection/my-holdings"} active={true}>
						My holdings
					</ListButton>
					<ListButton to={"/collection/consignments-to-others"}>
						Consignments (to Others)
					</ListButton>
					<ListButton to={"/collection/consignments-to-me"}>
						Consignments (to me)
					</ListButton>
					<ListButton to={"/offers/outgoing"}>
						Pending Sales
					</ListButton>
					<ListButton to={"/collection/"}>
						Add to your collection
					</ListButton>
				</div>
				<div className={styles.optionsContainer}>
					<h4 className={styles.h4}>Filter By Creator:</h4>
					<ListButton to={"/collection/"}>All</ListButton>
					<ListButton to={"/collection/"}>By Me</ListButton>
					<ListButton to={"/collection/"}>By others</ListButton>
				</div>
			</div>
			<div className={styles.shield} onClick={toggleDrawer}></div>
		</div>
	);
};
