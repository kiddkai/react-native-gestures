jest.mock("react-native", () => {
    const sinon = require("sinon")

    return {
        BlobModule: {
            BLOB_URI_SCHEME: "string",
        },
        PanResponder: {
            create: sinon.stub(),
        },
    }
})
