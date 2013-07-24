var buildRedirectConnection = function (redirectWhen, end, assert, testName, wrapStart) {
    var connection = testUtilities.createConnection("redirectionConnection", end, assert, testName, wrapStart);

    connection.qs = {
        redirectWhen: redirectWhen
    };

    return connection;
};

QUnit.module("Response redirection facts");

QUnit.asyncTimeoutTest("Transport connect fails on response redirection with error message.", testUtilities.defaultTestTimeout, function (end, assert, testName) {
    var connection = buildRedirectConnection("negotiate", end, assert, testName, false);

    connection.error(function (error) {
        assert.isSet(error, "Error message shoud be set.");
        assert.notEqual(error, "", "Error message should not be empty string.");
    });

    connection.start().done(function () {
        assert.fail("Connection was started successfully.");
        end();
    }).fail(function () {
        assert.comment("Connection should fail.");
        end();
    });

    // Cleanup
    return function () {
        connection.stop();
    };
});