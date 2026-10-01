import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { projectService } from '../services/authService';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import { FiSearch, FiPlus } from 'react-icons/fi';

/**
 * Projects Page
 */
const ProjectsPage = () => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problem: '',
    solution: '',
    techStack: '',
    features: '',
    githubLink: '',
    liveLink: '',
    workflow: '',
    challenges: '',
    futureImprovements: '',
    screenshots: '',
  });
  const [tab, setTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') === 'my' ? 'my' : 'all';
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [allRes, myRes] = await Promise.all([
          projectService.getAllProjects(search),
          projectService.getMyProjects(),
        ]);
        setProjects(allRes.data.data);
        setMyProjects(myRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTab(params.get('tab') === 'my' ? 'my' : 'all');
  }, [location.search]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        setSuccess('Project deleted successfully!');
        const [allRes, myRes] = await Promise.all([
          projectService.getAllProjects(search),
          projectService.getMyProjects(),
        ]);
        setProjects(allRes.data.data);
        setMyProjects(myRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required.');
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      problem: formData.problem || undefined,
      solution: formData.solution || undefined,
      githubLink: formData.githubLink || undefined,
      liveLink: formData.liveLink || undefined,
      workflow: formData.workflow || undefined,
      challenges: formData.challenges || undefined,
      futureImprovements: formData.futureImprovements || undefined,
    };

    if (formData.techStack.trim()) {
      const techStackArray = formData.techStack
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((name) => ({ name }));
      payload.techStack = JSON.stringify(techStackArray);
    }

    if (formData.features.trim()) {
      try {
        const featuresParsed = JSON.parse(formData.features);
        if (Array.isArray(featuresParsed)) {
          payload.features = JSON.stringify(featuresParsed);
        }
      } catch {
        setError('Features must be valid JSON array of objects. e.g. [{"title":"","description":""}]');
        return;
      }
    }

    if (formData.screenshots.trim()) {
      try {
        const screenshotsParsed = JSON.parse(formData.screenshots);
        if (Array.isArray(screenshotsParsed)) {
          payload.screenshots = JSON.stringify(screenshotsParsed);
        }
      } catch {
        setError('Screenshots must be valid JSON array of objects. e.g. [{"url":"","caption":""}]');
        return;
      }
    }

    try {
      await projectService.addProject(payload);
      setSuccess('Project added successfully!');
      setShowAddForm(false);
      setFormData({
        title: '',
        description: '',
        problem: '',
        solution: '',
        techStack: '',
        features: '',
        githubLink: '',
        liveLink: '',
        workflow: '',
        challenges: '',
        futureImprovements: '',
        screenshots: '',
      });
      const [allRes, myRes] = await Promise.all([
        projectService.getAllProjects(search),
        projectService.getMyProjects(),
      ]);
      setProjects(allRes.data.data);
      setMyProjects(myRes.data.data);
      setTab('my');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add project');
    }
  };

  if (loading) return <LoadingSpinner fullPage />;

  const displayProjects = tab === 'all' ? projects : myProjects;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Projects</h1>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiPlus /> {showAddForm ? 'Hide Form' : 'Add Project'}
        </button>
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError('')} />}
      {success && <SuccessMessage message={success} onClose={() => setSuccess('')} />}

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Project</h2>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project Title"
                className="border rounded-lg px-4 py-2"
                required
              />
              <input
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="GitHub Link (optional)"
                className="border rounded-lg px-4 py-2"
              />
            </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project Description"
                rows="4"
                className="w-full border rounded-lg px-4 py-2"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  placeholder="Live Project Link (optional)"
                  className="border rounded-lg px-4 py-2"
                />
                <input
                  name="workflow"
                  value={formData.workflow}
                  onChange={handleChange}
                  placeholder="Workflow Summary (optional)"
                  className="border rounded-lg px-4 py-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="Tech Stack (comma-separated, optional)"
                  className="border rounded-lg px-4 py-2"
                />
                <input
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleChange}
                  placeholder="Challenges (optional)"
                  className="border rounded-lg px-4 py-2"
                />
              </div>

              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                placeholder="Problem Statement (optional)"
                rows="3"
                className="w-full border rounded-lg px-4 py-2"
              />

              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                placeholder="Solution (optional)"
                rows="3"
                className="w-full border rounded-lg px-4 py-2"
              />

              <textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder='Features (JSON array, optional) e.g. [{"title":"...","description":"..."}]'
                rows="3"
                className="w-full border rounded-lg px-4 py-2"
              />

              <textarea
                name="screenshots"
                value={formData.screenshots}
                onChange={handleChange}
                placeholder='Screenshots (JSON array, optional) e.g. [{"url":"...","caption":"..."}]'
                rows="3"
                className="w-full border rounded-lg px-4 py-2"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Project
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-300">
        <button
          onClick={() => setTab('all')}
          className={`px-4 py-2 font-semibold ${tab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          All Projects
        </button>
        <button
          onClick={() => setTab('my')}
          className={`px-4 py-2 font-semibold ${tab === 'my' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          My Projects
        </button>
      </div>

      {/* Search */}
      {tab === 'all' && (
        <div className="mb-8 relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.length > 0 ? (
          displayProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={tab === 'my' ? handleDelete : null}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">
              {tab === 'all' ? 'No projects found' : 'You haven\'t created any projects yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
