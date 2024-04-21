import Container from 'react-bootstrap/Container';

function AnouBar() {
    return (
        <div
            className={'wrapper-anou-bar'}
            style={{ background: '#9e7c5d', color: '#ffffff', minHeight: '39px', fontSize: '13px', fontWeight: '500' }}
        >
            <Container>
                <div
                    className={'anou-bar-inner'}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <a href="/123" style={{ padding: '9px 0px', textAlign: 'center' }}>
                        LARGE INVENTORY + FREE SHIPPING *
                    </a>
                </div>
            </Container>
        </div>
    );
}

export default AnouBar;
