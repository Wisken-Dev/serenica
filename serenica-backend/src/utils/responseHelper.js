module.exports = {
success: (res, data) => res.json({ ok: true, ...data }),
error: (res, code = 500, message = 'Internal') => res.status(code).json({ ok: false, error: message })
};