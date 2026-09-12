import { useEffect, useState } from 'react'
import { useAdminStore, type Enrollment } from '../../store/adminStore'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const levelLabels: Record<string, string> = {
  kindergarten: 'Kindergarten',
  elementary: 'Elementary',
  'junior-high': 'Junior High',
  'senior-high': 'Senior High',
  college: 'College',
}

export default function AdminEnrollments() {
  const { enrollments, loading, fetchEnrollments, updateEnrollmentStatus } = useAdminStore()
  const [statusFilter, setStatusFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetchEnrollments({ status: statusFilter, level: levelFilter, search })
  }, [fetchEnrollments, statusFilter, levelFilter, search])

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingId(id)
    await updateEnrollmentStatus(id, status)
    setUpdatingId(null)
  }

  const getStudentName = (data: Record<string, unknown>) => {
    return `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unknown'
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">Enrollments</h2>
        <p className="text-sm text-gray-500">{enrollments.length} total submissions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1f40]/20 focus:border-[#0b1f40] w-full transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1f40]/20 focus:border-[#0b1f40]"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1f40]/20 focus:border-[#0b1f40]"
        >
          <option value="all">All Levels</option>
          <option value="kindergarten">Kindergarten</option>
          <option value="elementary">Elementary</option>
          <option value="junior-high">Junior High</option>
          <option value="senior-high">Senior High</option>
          <option value="college">College</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="px-6 py-10 text-center">
            <div className="w-8 h-8 border-4 border-[#0b1f40]/20 border-t-[#0b1f40] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-400">Loading enrollments...</p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-400">No enrollments found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Level</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => {
                  const data = enrollment.student_data as Record<string, string>
                  return (
                    <tr key={enrollment.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3">
                        <button
                          onClick={() => setSelectedEnrollment(enrollment)}
                          className="font-medium text-[#0b1f40] hover:underline text-left"
                        >
                          {getStudentName(data)}
                        </button>
                      </td>
                      <td className="px-6 py-3 text-gray-600">{levelLabels[enrollment.level] || enrollment.level}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[enrollment.status]}`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-500">{new Date(enrollment.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-right">
                        {enrollment.status === 'pending' && (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStatusChange(enrollment.id, 'approved')}
                              disabled={updatingId === enrollment.id}
                              className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium hover:bg-green-100 transition disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(enrollment.id, 'rejected')}
                              disabled={updatingId === enrollment.id}
                              className="px-2.5 py-1 bg-red-50 text-red-700 rounded-md text-xs font-medium hover:bg-red-100 transition disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedEnrollment(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Enrollment Details</h3>
              <button onClick={() => setSelectedEnrollment(null)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Status:</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedEnrollment.status]}`}>
                  {selectedEnrollment.status}
                </span>
                <span className="text-sm text-gray-500">Level:</span>
                <span className="text-sm font-medium text-gray-900">{levelLabels[selectedEnrollment.level]}</span>
              </div>

              {/* Student Data Grid */}
              {(() => {
                const data = selectedEnrollment.student_data as Record<string, string>
                const fieldLabels: Record<string, string> = {
                  firstName: 'First Name', middleName: 'Middle Name', lastName: 'Last Name',
                  age: 'Age', dob: 'Date of Birth', gender: 'Gender',
                  parentName: 'Parent/Guardian', parentContact: 'Contact', parentEmail: 'Email',
                  parentOccupation: 'Occupation', address: 'Address',
                  emergencyContact: 'Emergency Contact', emergencyPhone: 'Emergency Phone',
                  strand: 'Strand', degreeProgram: 'Degree Program',
                  highSchool: 'High School', yearGraduated: 'Year Graduated',
                  lrn: 'LRN', civilStatus: 'Civil Status',
                }
                return (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(data).map(([key, value]) => {
                      if (key === 'requirements' || typeof value === 'boolean' || value === null || value === undefined || value === '') return null
                      return (
                        <div key={key} className="bg-gray-50 rounded-lg p-3">
                          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{fieldLabels[key] || key}</div>
                          <div className="text-sm text-gray-900 font-medium">{String(value)}</div>
                        </div>
                      )
                    })}
                  </div>
                )
              })()}

              {/* Requirements */}
              {(() => {
                const data = selectedEnrollment.student_data as Record<string, unknown>
                const reqs = data.requirements as Record<string, boolean> | undefined
                if (!reqs) return null
                const reqLabels: Record<string, string> = {
                  birthCert: 'PSA Birth Certificate', Form137: 'Form 137', goodMoral: 'Good Moral',
                  medicalCert: 'Medical Certificate', idPhotos: 'ID Photos', interview: 'Interview',
                  shsDiploma: 'SHS Diploma', ncae: 'NCAE Certificate',
                }
                const entries = Object.entries(reqs).filter(([, v]) => typeof v === 'boolean')
                if (entries.length === 0) return null
                return (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {entries.map(([key, checked]) => (
                        <span key={key} className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${checked ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {checked ? '✓' : '✗'} {reqLabels[key] || key}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {/* Admin Notes */}
              {selectedEnrollment.admin_notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Admin Notes</div>
                  <div className="text-sm text-gray-700">{selectedEnrollment.admin_notes}</div>
                </div>
              )}

              <div className="text-xs text-gray-400">Submitted: {new Date(selectedEnrollment.created_at).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
