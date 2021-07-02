import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 450,
    },
    fullList: {
        width: 'auto',
    },
    width: {
        width: '100%'
    },
    border: {
        borderBottom: '0.5px solid #ccc',
        width: '100%'
    }
}));

const Sidebar = (props) => {
    const classes = useStyles();

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={props.toggleDrawer(anchor, false)}
            onKeyDown={props.toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button>
                    <Box display="flex" flexDirection="column" className={classes.width}>
                        <h1>{props.selectedCountry.name}</h1>
                        <hr className={classes.border} />
                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" my="1rem">
                            <h2>Flag</h2>
                            <img src={props.selectedCountry.flag} alt="Flag" height="32px" />
                        </Box>
                        {
                            [['Capital', props.selectedCountry.capital], ['Population', props.selectedCountry.population], ['Region', props.selectedCountry.region]].map((text) => {
                                return (
                                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" my="1rem">
                                        <h2>{text[0]}</h2>
                                        <p>{text[1]} </p>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </ListItem>
            </List>
        </div>
    );


    return (
        <>
            <div>
                {['right'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Drawer anchor={anchor} open={props.state[anchor]} onClose={props.toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>


        </>
    )
}

export default Sidebar
