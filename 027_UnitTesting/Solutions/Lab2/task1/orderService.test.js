jest.mock('./paymentService');
jest.mock('./emailService');

const { placeOrder } = require('./orderService');
const { charge } = require('./paymentService');
const { sendOrderConfirmation } = require('./emailService');

describe('placeOrder', () => {
        
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('a valid order returns an object with both orderId and transactionId', async () => {
        charge.mockResolvedValue({ success: true, transactionId: 'txn_test_123' });
        const result = await placeOrder('nagy', 'product1', 2);
        expect(result).toHaveProperty('orderId');
        expect(result).toHaveProperty('transactionId', 'txn_test_123');
    });

    test('sendOrderConfirmation is called with the correct email and the transactionId that came back from charge', async () => {
        charge.mockResolvedValue({ success: true, transactionId: 'txn_test_123' });
        await placeOrder('nagy', 'nagy@test.com', 2);
        expect(sendOrderConfirmation).toHaveBeenCalledWith('nagy@test.com', 'txn_test_123');
    });

    test('amount = 0 throws "Invalid amount" and charge is never called', async () => {
        await expect(placeOrder('nagy', 'nagy@test.com', 0)).rejects.toThrow('Invalid amount');
        expect(charge).not.toHaveBeenCalled();
        expect(sendOrderConfirmation).not.toHaveBeenCalled();
    });

    test('payment failure throws "Payment failed" and email is never sent', async () => {
        charge.mockResolvedValue({ success: false });
        await expect(placeOrder('nagy', 'nagy@test.com', 2)).rejects.toThrow('Payment failed');
        expect(sendOrderConfirmation).not.toHaveBeenCalled();
    });
});