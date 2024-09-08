const handleError = (res, err) => {
    if (err instanceof Error) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred' });
    } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

export {handleError};