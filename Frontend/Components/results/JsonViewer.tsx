import ReactJson from "@microlink/react-json-view";

const JsonViewer = ({ data }: { data: any }) => {
    return (
        <ReactJson
            src={data}
            theme="monokai"
            collapsed={false}
            displayDataTypes={false}
        />
    );
};

export default JsonViewer;