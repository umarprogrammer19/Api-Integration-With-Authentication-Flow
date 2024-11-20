const Footer = (props: { customClass?: string }) => {
    return (
        <footer className={`text-white rounded-t-lg mt-4 ${props.customClass}`}>
            <div className="max-w-screen-xl mx-auto text-center text-lg font-bold">
                <p>&copy; 2024 Umar Farooq. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
